from odoo import http
from odoo.http import request, Response
from odoo.exceptions import AccessDenied
import json as json_lib
import logging

_logger = logging.getLogger(__name__)

class AuthApiController(http.Controller):

    def _cors_headers(self):
        origin = request.httprequest.headers.get('Origin')

        headers = {
            'Access-Control-Allow-Origin': origin or '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin',
            'Access-Control-Allow-Credentials': 'true',
        }

        return headers

    def _json_response(self, data, status=200):
        return Response(
            json_lib.dumps(data),
            status=status,
            headers=self._cors_headers(),
            content_type='application/json'
        )

    def _options_response(self):
        return Response(
            '',
            status=200,
            headers=self._cors_headers()
        )

    @http.route('/api/auth/register', type='http', auth='public', methods=['POST', 'OPTIONS'], csrf=False)
    def register(self):

        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        payload = request.httprequest.get_json(silent=True) or {}

        name = payload.get('name')
        login = payload.get('login')
        password = payload.get('password')
        email = payload.get('email')
        phone = payload.get('phone')
        address = payload.get('address')

        if not name or not login or not password or not email:
            return self._json_response(
                {'ok': False, 'error': 'name, login, password and email are required'},
                status=400
            )

        user_model = request.env['res.users'].sudo()

        if user_model.search([('login', '=', login)], limit=1):
            return self._json_response(
                {'ok': False, 'error': 'login already exists'},
                status=409
            )

        user = user_model.create({
            'name': name,
            'login': login,
            'password': password,
            'email': email,
        })

        mobile_user = request.env['billnova.user'].sudo().create({
            'name': name,
            'email': email,
            'phone': phone,
            'address': address,
            'is_mobile_user': True,
<<<<<<< HEAD
=======
            'role': 'seller',
>>>>>>> d5a70c78988b43655bd9da58bea46a376cb4ef8a
            'res_user_id': user.id,
        })

        return self._json_response(
            {
                'ok': True,
                'user_id': user.id,
                'mobile_user_id': mobile_user.id,
            },
            status=201
        )

    @http.route('/api/auth/login', type='http', auth='public', methods=['POST', 'OPTIONS'], csrf=False)
    def login(self):
        if request.httprequest.method == 'OPTIONS':
            return self._options_response()

        # ────────────────────────────────────────────────
        # Tus logs de debug (manténlos)
        # ────────────────────────────────────────────────
        _logger.info("LOGIN DEBUG - Headers: %s", dict(request.httprequest.headers))
        _logger.info("LOGIN DEBUG - Content-Type: %s", request.httprequest.content_type)

        try:
            payload = request.httprequest.get_json(silent=False)
        except Exception as json_err:
            _logger.error("LOGIN ERROR - No es JSON válido: %s", str(json_err))
            return self._json_response(
                {'ok': False, 'error': 'El body debe ser un JSON válido (Content-Type: application/json)'},
                status=400
            )

        _logger.info("LOGIN DEBUG - Payload recibido (tipo: %s): %s", type(payload), payload)

        if not isinstance(payload, dict):
            _logger.error("LOGIN ERROR - Payload no es dict, es: %s", type(payload))
            return self._json_response(
                {'ok': False, 'error': 'Formato inválido: se esperaba un objeto JSON {}'},
                status=400
            )

        login = payload.get('login')
        password = payload.get('password')

        _logger.info("LOGIN DEBUG - login: %s | password presente: %s", login, bool(password))

        if not login or not password:
            return self._json_response(
                {'ok': False, 'error': 'Se requieren los campos "login" y "password"'},
                status=400
            )

        db = request.env.cr.dbname
        if not request.session.db:
            request.session.db = db
            _logger.info("LOGIN DEBUG - Asignada DB a sesión: %s", db)

        # ────────────────────────────────────────────────
        # AUTENTICACIÓN - patrón compatible (del código que funciona)
        # ────────────────────────────────────────────────
        uid = False
        user_agent_env = request.httprequest.environ or {}   # equivalente a user_agent_env

        try:
            _logger.info("LOGIN DEBUG - Intentando autenticar (modo moderno) con login: %s", login)

            # Intento 1: estilo Odoo nuevo (dict de credenciales)
            credential = {
                'type': 'password',
                'login': login,
                'password': password,
            }
            # Nota: algunos versiones esperan solo credential, otras credential + env
            try:
                auth_info = request.env['res.users'].sudo().authenticate(credential, user_agent_env)
                uid = auth_info.get('uid') if auth_info else False
            except TypeError:
                # Si falla por argumentos → prueba solo credential
                auth_info = request.env['res.users'].sudo().authenticate(credential)
                uid = auth_info.get('uid') if auth_info else False

        except Exception as e:
            _logger.debug("Modo moderno falló: %s - %s", type(e).__name__, str(e))
            uid = False

        # Fallback: modo antiguo (directo en el registro)
        if not uid:
            _logger.info("LOGIN DEBUG - Cayendo a fallback (modo antiguo)")
            try:
                user = request.env['res.users'].sudo().search([('login', '=', login)], limit=1)
                if user:
                    # Solo password (tu versión no acepta env como dict)
                    user._check_credentials(password)   # ← sin segundo argumento
                    uid = user.id
            except odoo.exceptions.AccessDenied:
                uid = False
            except Exception as fallback_err:
                _logger.error("Fallback error: %s", str(fallback_err))
                uid = False

        if not uid:
            return self._json_response(
                {'ok': False, 'error': 'Credenciales inválidas'},
                status=401
            )

        # Configurar sesión (necesario para mantener auth en llamadas futuras)
        # Configurar sesión
        request.session.db = db
        request.session.uid = uid
        request.session.login = login

        # Intento opcional de corregir idioma (solo si existe el método)
        if hasattr(request.session, '_fix_lang'):
            try:
                request.session._fix_lang(request.env)
            except Exception:
                pass
     
        _logger.info("LOGIN ÉXITO - UID: %s | session.sid: %s", uid, request.session.sid)

        return self._json_response({
            'ok': True,
            'uid': uid,
            'session_id': request.session.sid,
            # debug opcional
            'debug_info': {'db': db, 'login_used': login}
        }, status=200)