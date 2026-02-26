from odoo import http
from odoo.http import request
from odoo.exceptions import AccessDenied


class AuthApiController(http.Controller):
    @http.route('/api/auth/register', type='http', auth='public', methods=['POST'], csrf=False)
    def register(self):
        payload = request.httprequest.get_json(silent=True) or {}

        name = payload.get('name')
        login = payload.get('login')
        password = payload.get('password')
        email = payload.get('email')
        phone = payload.get('phone')
        address = payload.get('address')

        if not name or not login or not password or not email:
            return request.make_json_response(
                {'ok': False, 'error': 'name, login, password and email are required'},
                status=400,
            )

        user_model = request.env['res.users'].sudo()
        existing_user = user_model.search([('login', '=', login)], limit=1)
        if existing_user:
            return request.make_json_response({'ok': False, 'error': 'login already exists'}, status=409)

        user_vals = {
            'name': name,
            'login': login,
            'password': password,
            'email': email,
        }
        user = user_model.create(user_vals)

        request.env['proyect.app.user'].sudo().create(
            {
                'name': name,
                'email': email,
                'phone': phone,
                'address': address,
                'res_user_id': user.id,
            }
        )

        return request.make_json_response({'ok': True, 'user_id': user.id}, status=201)

    @http.route('/api/auth/login', type='http', auth='public', methods=['POST'], csrf=False)
    def login(self):
        payload = request.httprequest.get_json(silent=True) or {}
        login = payload.get('login')
        password = payload.get('password')

        if not login or not password:
            return request.make_json_response({'ok': False, 'error': 'login and password are required'}, status=400)

        try:
            uid = request.session.authenticate(request.db, login, password)
        except AccessDenied:
            uid = False

        if not uid:
            return request.make_json_response({'ok': False, 'error': 'invalid credentials'}, status=401)

        return request.make_json_response({'ok': True, 'uid': uid}, status=200)

    @http.route('/api/auth/logout', type='http', auth='user', methods=['POST'], csrf=False)
    def logout(self):
        request.session.logout(keep_db=True)
        return request.make_json_response({'ok': True}, status=200)
