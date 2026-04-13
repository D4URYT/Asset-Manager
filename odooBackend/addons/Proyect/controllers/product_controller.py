from odoo import http
from odoo.http import request, Response
import json as json_lib

class ProductApiController(http.Controller):

    def _cors_headers(self):
        origin = request.httprequest.headers.get('Origin')

        return {
            'Access-Control-Allow-Origin': origin or '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin',
            'Access-Control-Allow-Credentials': 'true',   # 👈 CAMBIA ESTO
        }

    def _json_response(self, data, status=200):
        return Response(
            json_lib.dumps(data),
            status=status,
            headers=self._cors_headers(),
            content_type='application/json'
        )

    def _options_response(self):
        return Response('', status=200, headers=self._cors_headers())


    # ========================
    # LIST
    # ========================
    @http.route('/api/products', type='http', auth='public',methods=['GET', 'OPTIONS'], csrf=False)
    def list_products(self):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        products = request.env['product.product'].sudo().search([])
        data = [{
            'id': p.id,
            'name': p.name,
            'default_code': p.default_code,
            'list_price': p.list_price,
        } for p in products]

        return self._json_response({'ok': True, 'data': data})


    # ========================
    # GET ONE
    # ========================
<<<<<<< HEAD
    @http.route('/api/products/<int:product_id>', type='http',auth='user', methods=['GET', 'OPTIONS'], csrf=False)
=======
    @http.route('/api/products/<int:product_id>', type='http', auth='public', methods=['GET', 'OPTIONS'], csrf=False)
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
    def get_product(self, product_id):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        product = request.env['product.product'].sudo().browse(product_id)
        if not product.exists():
            return self._json_response({'ok': False, 'error': 'Product not found'}, 404)

        return self._json_response({
            'ok': True,
            'data': {
                'id': product.id,
                'name': product.name,
                'default_code': product.default_code,
                'list_price': product.list_price,
            }
        })

<<<<<<< HEAD

    # ========================
    # CREATE
    # ========================
    @http.route('/api/products/create', type='http',auth='user', methods=['POST', 'OPTIONS'], csrf=False)
=======
    # ========================
    # CREATE
    # ========================
    @http.route('/api/products/create', type='http',auth='public', methods=['POST', 'OPTIONS'], csrf=False)
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
    def create_product(self):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        payload = request.httprequest.get_json(silent=True) or {}
        name = payload.get('name')

        if not name:
            return self._json_response({'ok': False, 'error': 'name is required'}, 400)

        product = request.env['product.product'].sudo().create({
            'name': name,
            'default_code': payload.get('default_code'),
            'list_price': payload.get('list_price', 0.0),
        })

        return self._json_response({'ok': True, 'id': product.id}, 201)