# -*- coding: utf-8 -*-
{
    'name': "Awesome Clicker",

    'summary': """
        Starting module for the JS framework tutorial, chapter 1: build a clicker game
    """,

    'description': """
        Starting module for the JS framework tutorial, chapter 1: build a cliker game
    """,

    'author': "Odoo",
    'website': "https://www.odoo.com/",

    'category': 'Productivity',
    'version': '0.1',
    'application': True,
    'installable': True,
    'depends': ['base', 'web'],

    'data': [
    ],
    'assets': {
        'web.assets_backend': [
            'awesome_clicker/static/src/**/*',
        ],

    },
    'license': 'AGPL-3'
}
