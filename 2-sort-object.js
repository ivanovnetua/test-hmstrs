// Есть многомерный объект он динамичен в формировании при каждом запросе, 
// необходимо написать функцию которая преобразует его в плоский формат.
// Учесть именование ключей если объект дочерний чтобы  
// в итоге результирующее имя ключа содержало ключи всех объектов родителей в порядке вложенности

class SortObj {

    constructor(obj) {
        this.defaultObj = obj;
        this.result = {};
    }

    _isArray(a) {
        return (!!a) && (a.constructor === Array);
    };
    
    _isObject(a) {
        return (!!a) && (a.constructor === Object);
    };

    transformRecursive(data, name = '') {
        if (this._isArray(data)) {
            data.forEach(child => {
                if (this._isArray(child)) {
                    this.transformRecursive(child, name + child);
                } else if (this._isObject(child)) {
                    this.transformRecursive(child, name);
                } else {
                    this.result[name + child] = child;
    
                }
            });
    
        } else if (this._isObject(data))  {
            for (var child in data) {    
                if (this._isArray(data[child]) || this._isObject(data[child])) {
                    this.transformRecursive(data[child], name + child);
                } else {
                    this.result[name + child] = data[child];
                }
            }
    
        } else {
            throw new Error("Format data is not valid: ");
        }

    }

    getsortedObject() {
        this.transformRecursive(this.defaultObj);

        return this.result
    }

}

(function main() {

    const multidimensionalObject = {
        "User": 1,
        "Data": {
            "FirstName": "Anonimoys",
            "LastName": "AnonimoysLastName",
            "MiddleName": "AnonimoysMiddleName",
            "Role": [
                1, 2, 4, {
                    "isOwner" : true
                },
                {
                    "hidden" : null
                }
            ]
        },
        "Profile": [
            {
                "Check": true,
                "CheckRole": [
                    1, 2, 34
                ]
            },
            {
                "Settings": {
                    "Rider": [
                        1, 2, 3, 4
                    ],
                    "Inside": {
                        "In": true,
                        "Out": null
                    }
                }
            }
        ]
    };
    
    const sortObject = new SortObj(multidimensionalObject);
    let sortedObj = sortObject.getsortedObject();

    console.log(sortedObj);


})();