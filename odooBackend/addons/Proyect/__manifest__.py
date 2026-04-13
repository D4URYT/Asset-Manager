{
    'name': 'BillNova',
    'version': '1.0.0',
    'summary': 'Modulo base BillNova',
    'description': 'Estructura inicial del modulo BillNova.',
    'author': 'Wilkins',
    'category': 'Tools',
    'license': 'LGPL-3',
<<<<<<< HEAD
    'depends': ['base', 'point_of_sale', 'sale', 'account'],
=======
    'depends': ['base', 'point_of_sale', 'sale', 'account', 'mail', 'rating', 'product'],
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
    'data': [
        'security/ir.model.access.csv',
        'views/users_views.xml',
    ],
    'installable': True,
    'application': True,
}
