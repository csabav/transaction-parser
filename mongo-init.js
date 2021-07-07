db.auth('admin', 'password');

db.createCollection('users');
db.createCollection('transactions');

db.users.insert([
  {
    _id: ObjectId(),
    name: 'Isabell Nielsen',
    accounts: [
      {
        routingNumber: '011000015',
        accountNumber: '6622085487',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'Shanelle Atkinson',
    accounts: [
      {
        routingNumber: '021001208',
        accountNumber: '0018423486',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'Akshay Zamora',
    accounts: [
      {
        routingNumber: '021001208',
        accountNumber: '1691452698',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'Haaris Roy',
    accounts: [
      {
        routingNumber: '011000015',
        accountNumber: '3572176408',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'Floyd Weir',
    accounts: [
      {
        routingNumber: '011000015',
        accountNumber: '8149516692',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'Lemar Edge',
    accounts: [
      {
        routingNumber: '011000015',
        accountNumber: '7438979785',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'June Mellor',
    accounts: [
      {
        routingNumber: '011000015',
        accountNumber: '1690537988',
      },
      {
        routingNumber: '021001208',
        accountNumber: '1690537989',
      },
    ],
  },
  {
    _id: ObjectId(),
    name: 'Velma Tierney',
    accounts: [
      {
        routingNumber: '011000015',
        accountNumber: '6018423486',
      },
    ],
  },
]);
