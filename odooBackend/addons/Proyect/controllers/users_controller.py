from odoo import http
from odoo.http import request, Response
import json as json_lib
import logging

_logger = logging.getLogger(__name__)

class UserApiController(http.Controller):

    # =========================
    # Helpers
    # =========================

    def _cors_headers(self):
        origin = request.httprequest.headers.get('Origin')
        return {
            'Access-Control-Allow-Origin': origin or '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        }

    def _json_response(self, data, status=200):
        return Response(
            json_lib.dumps(data),
            status=status,
            headers={**self._cors_headers(), 'Content-Type': 'application/json'}
        )

    def _options_response(self):
        return Response(
            status=200,
            headers=self._cors_headers()
        )

    # =========================
    # GET - Listar usuarios
    # =========================

    @http.route('/api/users', type='http', auth='public', methods=['GET', 'OPTIONS'], csrf=False)
    def list_users(self, **kwargs):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        users = request.env['res.users'].sudo().search([])

        data = []
        for user in users:
            data.append({
                'id': user.id,
                'name': user.name,
                'login': user.login,
                'email': user.email,
                'active': user.active,
            })

        return self._json_response({'data': data})

    # =========================
    # GET - Usuario por ID
    # =========================

    @http.route('/api/users/<int:user_id>', type='http', auth='public', methods=['GET', 'OPTIONS'], csrf=False)
    def get_user(self, user_id):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        user = request.env['res.users'].sudo().browse(user_id)

        if not user.exists():
            return self._json_response({'error': 'Usuario no encontrado'}, 404)

        data = {
            'id': user.id,
            'name': user.name,
            'login': user.login,
            'email': user.email,
            'active': user.active,
        }

        return self._json_response({'data': data})

    # =========================
    # POST - Crear usuario
    # =========================

    @http.route('/api/users', type='http', auth='public', methods=['POST', 'OPTIONS'], csrf=False)
    def create_user(self):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        try:
            body = json_lib.loads(request.httprequest.data)

            user = request.env['res.users'].sudo().create({
                'name': body.get('name'),
                'login': body.get('login'),
                'email': body.get('email'),
                'password': body.get('password'),
            })

            return self._json_response({
                'message': 'Usuario creado correctamente',
                'id': user.id
            }, 201)

        except Exception as e:
            _logger.exception("Error creando usuario")
            return self._json_response({'error': str(e)}, 400)

    # =========================
    # PUT - Actualizar usuario
    # =========================

    @http.route('/api/users/<int:user_id>', type='http', auth='public', methods=['PUT', 'OPTIONS'], csrf=False)
    def update_user(self, user_id):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        user = request.env['res.users'].sudo().browse(user_id)

        if not user.exists():
            return self._json_response({'error': 'Usuario no encontrado'}, 404)

        try:
            body = json_lib.loads(request.httprequest.data)

            user.write({
                'name': body.get('name', user.name),
                'login': body.get('login', user.login),
                'email': body.get('email', user.email),
                'active': body.get('active', user.active),
            })

            if body.get('password'):
                user.write({'password': body.get('password')})

            return self._json_response({'message': 'Usuario actualizado correctamente'})

        except Exception as e:
            _logger.exception("Error actualizando usuario")
            return self._json_response({'error': str(e)}, 400)

    # =========================
    # DELETE - Eliminar usuario
    # =========================

    @http.route('/api/users/<int:user_id>', type='http', auth='public', methods=['DELETE', 'OPTIONS'], csrf=False)
    def delete_user(self, user_id):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        user = request.env['res.users'].sudo().browse(user_id)

        if not user.exists():
            return self._json_response({'error': 'Usuario no encontrado'}, 404)

        try:
            user.unlink()
            return self._json_response({'message': 'Usuario eliminado correctamente'})
        except Exception as e:
            _logger.exception("Error eliminando usuario")
            return self._json_response({'error': str(e)}, 400)
        
    @http.route('/api/billnova-users', type='http', auth='public', methods=['GET', 'OPTIONS'], csrf=False)
    def list_billnova_users(self, **kwargs):
        if request.httprequest.method == 'OPTIONS':
            return self._options_response()
        users = request.env['billnova.user'].sudo().search([])
        data = [{'id': u.id, 'name': u.name, 'email': u.email,
                 'phone': u.phone, 'address': u.address,
                 'is_mobile_user': u.is_mobile_user,
                 'res_user_id': u.res_user_id.id} for u in users]
        return self._json_response({'data': data})

    @http.route('/api/billnova-users/<int:user_id>', type='http', auth='public', methods=['GET', 'OPTIONS'], csrf=False)
    def get_billnova_user(self, user_id):
        if request.httprequest.method == 'OPTIONS':
            return self._options_response()
        u = request.env['billnova.user'].sudo().browse(user_id)
        if not u.exists():
            return self._json_response({'error': 'No encontrado'}, 404)
        return self._json_response({'data': {'id': u.id, 'name': u.name,
            'email': u.email, 'phone': u.phone, 'address': u.address,
            'is_mobile_user': u.is_mobile_user, 'res_user_id': u.res_user_id.id}})

    @http.route('/api/billnova-users', type='http', auth='public', methods=['POST', 'OPTIONS'], csrf=False)
    def create_billnova_user(self):
        if request.httprequest.method == 'OPTIONS':
            return self._options_response()
        try:
            body = json_lib.loads(request.httprequest.data)
            u = request.env['billnova.user'].sudo().create({
                'name': body.get('name'), 'email': body.get('email'),
                'phone': body.get('phone'), 'address': body.get('address'),
                'is_mobile_user': body.get('is_mobile_user', False),
                'res_user_id': body.get('res_user_id'),
            })
            return self._json_response({'message': 'Creado', 'id': u.id}, 201)
        except Exception as e:
            return self._json_response({'error': str(e)}, 400)

    @http.route('/api/billnova-users/<int:user_id>', type='http', auth='public', methods=['PUT', 'OPTIONS'], csrf=False)
    def update_billnova_user(self, user_id):
        if request.httprequest.method == 'OPTIONS':
            return self._options_response()
        u = request.env['billnova.user'].sudo().browse(user_id)
        if not u.exists():
            return self._json_response({'error': 'No encontrado'}, 404)
        try:
            body = json_lib.loads(request.httprequest.data)
            u.write({'phone': body.get('phone', u.phone),
                     'address': body.get('address', u.address),
                     'is_mobile_user': body.get('is_mobile_user', u.is_mobile_user)})
            return self._json_response({'message': 'Actualizado'})
        except Exception as e:
            return self._json_response({'error': str(e)}, 400)

    @http.route('/api/billnova-users/<int:user_id>', type='http', auth='public', methods=['DELETE', 'OPTIONS'], csrf=False)
    def delete_billnova_user(self, user_id):
        if request.httprequest.method == 'OPTIONS':
            return self._options_response()
        u = request.env['billnova.user'].sudo().browse(user_id)
        if not u.exists():
            return self._json_response({'error': 'No encontrado'}, 404)
        try:
            u.unlink()
            return self._json_response({'message': 'Eliminado'})
        except Exception as e:
            return self._json_response({'error': str(e)}, 400)