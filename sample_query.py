#!/usr/bin/env python3
"""
Sample query demonstrating two scientific skills:
1. ChEMBL Database - Find potent EGFR kinase inhibitors
2. Datamol - Analyze molecular properties and drug-likeness
"""

from chembl_webresource_client.new_client import new_client
import datamol as dm
import pandas as pd

print("=" * 60)
print("Drug Discovery Workflow: EGFR Kinase Inhibitors")
print("Skills used: ChEMBL Database + Datamol")
print("=" * 60)

# ============================================================
# STEP 1: ChEMBL - Find potent EGFR inhibitors
# ============================================================
print("\n[ChEMBL] Searching for potent EGFR inhibitors (IC50 < 100 nM)...")

activity = new_client.activity
molecule = new_client.molecule

# Query for EGFR (CHEMBL203) inhibitors with IC50 < 100 nM
activities = activity.filter(
    target_chembl_id='CHEMBL203',  # EGFR
    standard_type='IC50',
    standard_value__lte=100,  # <= 100 nM
    standard_units='nM'
)

# Get first 20 results
activity_list = list(activities[:20])
print(f"[ChEMBL] Found {len(activity_list)} potent compounds")

# Extract compound information
compounds_data = []
for act in activity_list:
    mol_id = act['molecule_chembl_id']
    mol_data = molecule.get(mol_id)

    if mol_data and mol_data.get('molecule_structures'):
        smiles = mol_data['molecule_structures'].get('canonical_smiles')
        if smiles:
            compounds_data.append({
                'chembl_id': mol_id,
                'smiles': smiles,
                'ic50_nM': act['standard_value'],
                'pchembl': act.get('pchembl_value')
            })

print(f"[ChEMBL] Retrieved structures for {len(compounds_data)} compounds")

# ============================================================
# STEP 2: Datamol - Analyze molecular properties
# ============================================================
print("\n[Datamol] Analyzing molecular properties...")

# Convert SMILES to molecules
mols = []
valid_data = []
for data in compounds_data:
    mol = dm.to_mol(data['smiles'])
    if mol:
        mol = dm.standardize_mol(mol)
        if mol:
            mols.append(mol)
            valid_data.append(data)

print(f"[Datamol] Successfully parsed {len(mols)} molecules")

# Compute descriptors
descriptors_list = []
for mol in mols:
    desc = dm.descriptors.compute_many_descriptors(mol)
    descriptors_list.append(desc)

# Create results DataFrame
results_df = pd.DataFrame(valid_data)
desc_df = pd.DataFrame(descriptors_list)

# Merge compound info with descriptors
final_df = pd.concat([results_df.reset_index(drop=True), desc_df], axis=1)

# ============================================================
# STEP 3: Drug-likeness Analysis (Lipinski's Rule of Five)
# ============================================================
print("\n[Datamol] Evaluating drug-likeness (Lipinski's Rule of Five)...")

final_df['lipinski_violations'] = (
    (final_df['mw'] > 500).astype(int) +
    (final_df['clogp'] > 5).astype(int) +
    (final_df['n_lipinski_hbd'] > 5).astype(int) +
    (final_df['n_lipinski_hba'] > 10).astype(int)
)

final_df['is_druglike'] = final_df['lipinski_violations'] <= 1

# ============================================================
# Results Summary
# ============================================================
print("\n" + "=" * 60)
print("RESULTS SUMMARY")
print("=" * 60)

print(f"\nTotal compounds analyzed: {len(final_df)}")
print(f"Drug-like compounds: {final_df['is_druglike'].sum()}")

print("\n--- Top 5 Most Potent Drug-like Compounds ---")
druglike = final_df[final_df['is_druglike']].sort_values('ic50_nM')

for i, row in druglike.head(5).iterrows():
    print(f"\n{row['chembl_id']}:")
    print(f"  IC50: {float(row['ic50_nM']):.2f} nM")
    print(f"  MW: {row['mw']:.1f} Da")
    print(f"  cLogP: {row['clogp']:.2f}")
    print(f"  HBD/HBA: {int(row['n_lipinski_hbd'])}/{int(row['n_lipinski_hba'])}")
    print(f"  TPSA: {row['tpsa']:.1f} Å²")

print("\n--- Property Statistics ---")
print(f"Molecular Weight: {final_df['mw'].mean():.1f} ± {final_df['mw'].std():.1f} Da")
print(f"cLogP: {final_df['clogp'].mean():.2f} ± {final_df['clogp'].std():.2f}")
print(f"TPSA: {final_df['tpsa'].mean():.1f} ± {final_df['tpsa'].std():.1f} Å²")

# Save results
output_file = "egfr_inhibitors_analysis.csv"
final_df.to_csv(output_file, index=False)
print(f"\n[Output] Results saved to: {output_file}")

print("\n" + "=" * 60)
print("Query complete!")
print("=" * 60)
