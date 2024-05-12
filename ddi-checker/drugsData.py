import pandas as pd


def create_drugs_interaction_dict():
    ddinter_downloads_code_V_file = "data/ddinter_downloads_code_V.csv"

    df = pd.read_csv(ddinter_downloads_code_V_file)

    interaction_dict = {
        tuple(sorted([drug_A, drug_B])): level
        for drug_A, drug_B, level in zip(df['Drug_A'], df['Drug_B'], df['Level'])
    }
    return interaction_dict


def create_drug_dict():
    ddinter_downloads_code_V_file = "data/ddinter_downloads_code_V.csv"

    df = pd.read_csv(ddinter_downloads_code_V_file)

    drugA_list = df['Drug_A'].unique()
    drugB_list = df['Drug_B'].unique()

    drugA_list.sort()
    drugB_list.sort()

    return drugA_list.tolist(), drugB_list.tolist()


def get_interaction_level(drug_A, drug_B):
    interaction_dict = create_drugs_interaction_dict()
    drug_pair = tuple(sorted([drug_A, drug_B]))
    return interaction_dict.get(drug_pair, "No interaction found")
