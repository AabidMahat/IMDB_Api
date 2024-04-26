import json

def add_unique_ids_to_medicines(json_file_path):
    # Load the JSON data from the file
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    
    # Add unique IDs to each medicine entry
    for idx, medicine in enumerate(data['medicines'], start=1):
        medicine['id'] = idx
    
    # Write the updated JSON data back to the file
    with open(json_file_path, 'w') as file:
        json.dump(data, file, indent=2)

# Example usage:
json_file_path = './src/data/project.json'
add_unique_ids_to_medicines(json_file_path)