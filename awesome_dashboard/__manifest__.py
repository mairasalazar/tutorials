# -*- coding: utf-8 -*-
{
    'name': "Awesome Dashboard",

    'summary': """
        Starting module for the JS framework tutorial, chapter 2
    """,

    'description': """
        Starting module for the JS framework tutorial, chapter 2
    """,

    'author': "Odoo",
    'website': "https://www.odoo.com/",

    'category': 'Productivity',
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'web', 'mail', 'crm'],

    'data': [
        'views/views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'awesome_dashboard/static/src/**/*',
            ('remove', 'awesome_dashboard/static/src/dashboard/**/*'),
        ],
        'awesome_dashboard.dashboard': [
            'awesome_dashboard/static/src/dashboard/**/*'
        ]

    },
    'license': 'AGPL-3'
}
