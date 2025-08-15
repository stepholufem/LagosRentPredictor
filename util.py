import json
import pickle
import numpy as np


__towns = None
__town = None
__communities = None
__community = None
__eco_class = None
__eco_classes = None
__model = None


def get_estimated_price(bedroom, bathroom, toilet, yearadded, community, town, eco_class):
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    try:
        town_index = __towns.index('town_'+town.lower())
    except:
        town_index = -1

    try:
        community_index = __communities.index('comm_'+community.lower())
    except:
        community_index = -1

    try:
        eco_class_index = __eco_classes.index('eco_'+eco_class.lower())
    except:
        eco_class_index = -1

    x = np.zeros(312)
    x[0] = bedroom
    x[1] = bathroom
    x[2] = toilet
    x[3] = yearadded
    if town_index >= 0:
        x[town_index] = 1
    else:
        pass

    if community_index >= 0:
        x[community_index] = 1
    else:
        pass

    if eco_class_index >= 0:
        x[eco_class_index] = 1
    else:
        pass

    return round(model.predict([x])[0], 2)



def get_towns():
    return __town


def get_communities():
    return __community


def get_eco_class():
    return __eco_class


def load_saved_artifacts():
    print("loading saved artifacts...")
    global __towns
    global __town
    global __communities
    global __community
    global __eco_classes
    global __eco_class
    global __model

    try:
        with open("artifacts/townss.json", "r") as f:
            __towns = json.load(f)['towns']
            __town = __towns[:]

        with open("artifacts/communities.json", "r") as f:
            __communities = json.load(f)['communities']
            __community = __communities[:]

        with open("artifacts/eco_classes.json", "r") as f:
            __eco_classes = json.load(f)['eco_classes']
            __eco_class = __eco_classes[:]

        with open("artifacts/LagosHouseRent1.pkl", 'rb') as f:
            __model = pickle.load(f)

        print('Successfully loaded all artifacts')
    except Exception as e:
        print('Error loading artifacts:', e)


if __name__ == "__main__":
    load_saved_artifacts()
    print(get_estimated_price(4, 2, 2, 2023, 'Ikeja', 'Ikeja', 'Lower'))

