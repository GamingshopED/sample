import csv
import json

def csv_to_json(file): 
    with open(file, newline='\n') as rawc:

        data = []
        s_cache = []
        csv_data = csv.reader(rawc, delimiter=';')

        for row in csv_data:
            if row[0] not in s_cache:
                s_cache.append(row[0])
                newsection = {
                    "title": row[0].capitalize().strip(),
                    "items": [],
                }
                if ".png" in row[1]: newsection["image"] = row[1]
                data.append(newsection)
                if ".png" in row[1]: continue

            data[len(data) - 1]["items"].append({
                "title": row[1].capitalize().strip(),
                "price": int(float(row[2]) * 100),
                "description": row[3].lower().strip(),
            })

        return data
        with open(file.replace("csv", "json"), 'r+') as f:
            f.seek(0)
            f.write(json.dumps({ "sections": data }))
            f.truncate()

with open("./scripts/.output/it-menu.json", 'w') as f:
    f.seek(0)
    f.write(json.dumps({
        "menus": [
            {
                "title": "Cibo",
                "sections": csv_to_json("./data/it-food.csv")
            },
            {
                "title": "Bevande",
                "sections": csv_to_json("./data/it-drinks.csv")
            },
        ]
    }))
    f.truncate()

with open("./scripts/.output/en-menu.json", 'w') as f:
    f.seek(0)
    f.write(json.dumps({
        "menus": [
            {
                "title": "Food",
                "sections": csv_to_json("./data/en-food.csv")
            },
            {
                "title": "Drinks",
                "sections": csv_to_json("./data/en-drinks.csv")
            },
        ]
    }))
    f.truncate()
