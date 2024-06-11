import requests
import csv
import time

def fetch_variant_details(variant_id, dataset='gnomad_r4'):
    query = """
    query ($variantId: String!, $dataset: DatasetId!) {
        variant(variantId: $variantId, dataset: $dataset) {
            variant_id
            chrom
            pos
            ref
            alt
            exome {
                ac
                an
                homozygote_count
            }
            genome {
                ac
                an
                homozygote_count
            }
            joint {
                ac
                an
                homozygote_count
                populations {
                    id
                    ac
                    an
                    homozygote_count
                }
            }
        }
    }
    """

    variables = {
        "variantId": variant_id,
        "dataset": dataset
    }

    for attempt in range(5):
        response = requests.post(
            'https://gnomad.broadinstitute.org/api',
            json={'query': query, 'variables': variables}
        )

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            wait_time = 5 * (attempt + 1)
            print(f"429 Too Many Requests - waiting {wait_time} seconds before retrying...")
            time.sleep(wait_time)
        else:
            raise Exception(f"Query failed with status code {response.status_code}: {response.text}")

    raise Exception("Query failed after multiple retries due to rate limiting.")

if __name__ == "__main__":
    variants = [
'2-233760233-C-CAT'
    ]

    results_list = []

    for variant_id in variants:
        try:
            result = fetch_variant_details(variant_id)
            
            variant_data = result.get('data', {}).get('variant', {})
            exome_data = variant_data.get('exome', {})
            genome_data = variant_data.get('genome', {})
            joint_data = variant_data.get('joint', {})
            mid_population = next((pop for pop in joint_data.get('populations', []) if pop['id'] == 'mid'), {})

            exome_af = exome_data.get('ac', 0) / exome_data.get('an', 1) if exome_data else 0
            genome_af = genome_data.get('ac', 0) / genome_data.get('an', 1) if genome_data else 0
            joint_af = joint_data.get('ac', 0) / joint_data.get('an', 1) if joint_data else 0
            mid_af = mid_population.get('ac', 0) / mid_population.get('an', 1) if mid_population else 0

            print(f"Variant ID: {variant_data.get('variant_id')}")
            print(f"Chromosome: {variant_data.get('chrom')}")
            print(f"Position: {variant_data.get('pos')}")
            print(f"Reference: {variant_data.get('ref')}")
            print(f"Alternate: {variant_data.get('alt')}")
    
            if exome_data:
                print("Exome Data:")
                print(f"  Allele Count (AC): {exome_data.get('ac')}")
                print(f"  Allele Number (AN): {exome_data.get('an')}")
                print(f"  Homozygote Count: {exome_data.get('homozygote_count')}")
                print(f"  Allele Frequency (AF): {exome_af}")
                exome_homozygote_count = exome_data.get('homozygote_count', 0) 
            else:
                print("Exome Data: no data")
                exome_af = 0 
                exome_homozygote_count = 0  

            if genome_data:
                print("Genome Data:")
                print(f"  Allele Count (AC): {genome_data.get('ac')}")
                print(f"  Allele Number (AN): {genome_data.get('an')}")
                print(f"  Homozygote Count: {genome_data.get('homozygote_count')}")
                print(f"  Allele Frequency (AF): {genome_af}")
                genome_homozygote_count = genome_data.get('homozygote_count', 0)
            else:
                print("Genome Data: no data")
                genome_af = 0  
                genome_homozygote_count = 0  

            if joint_data:
                print("Joint Data:")
                print(f"  Allele Count (AC): {joint_data.get('ac')}")
                print(f"  Allele Number (AN): {joint_data.get('an')}")
                print(f"  Homozygote Count: {joint_data.get('homozygote_count')}")
                print(f"  Allele Frequency (AF): {joint_af}")
                joint_homozygote_count = joint_data.get('homozygote_count', 0) 
            else:
                print("Joint Data: no data")
                joint_af = 0 
                joint_homozygote_count = 0  

            if mid_population:
                print("Middle Eastern Population Data:")
                print(f"  Allele Count (AC): {mid_population.get('ac')}")
                print(f"  Allele Number (AN): {mid_population.get('an')}")
                print(f"  Homozygote Count: {mid_population.get('homozygote_count')}")
                print(f"  Allele Frequency (AF): {mid_af}")
                mid_homozygote_count = mid_population.get('homozygote_count', 0) 
            else:
                print("Middle Eastern Population Data: no data")
                mid_af = 0 
                mid_homozygote_count = 0  
        
            print("="*50)  

        except Exception as e:
            print(f"Error querying variant {variant_id}: {e}")
            variant_data = {}

            exome_homozygote_count = 0
            exome_af = 0
            genome_homozygote_count = 0
            genome_af = 0
            joint_homozygote_count = 0
            joint_af = 0
            mid_homozygote_count = 0
            mid_af = 0

        results_list.append([
            variant_data.get('variant_id', variant_id),
            exome_homozygote_count,
            exome_af,
            genome_homozygote_count,
            genome_af,
            joint_homozygote_count,
            joint_af,
            mid_homozygote_count,
            mid_af
        ])

        time.sleep(5)

    csv_file_path = "gnomadresults.csv"
    with open(csv_file_path, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Variant', 'Exome Homozygote count', 'Exome AF', 'Genome Homozygote count', 'Genome AF', 'Joint Homozygote count', 'Joint AF', 'Middle Eastern Homozygote count', 'Middle Eastern AF'])
        writer.writerows(results_list)

    print(f"Results saved to {csv_file_path}")
