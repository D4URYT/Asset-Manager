from odoo import http
from odoo.http import request
import json


class ProductReviewController(http.Controller):

    # Crear comentario
    @http.route('/api/products/<int:product_id>/comments', type='http', auth='public', methods=['POST'], csrf=False)
    def create_comment(self, product_id):

        comment = request.params.get("comment")

        if not comment:
            return request.make_json_response({
                "error": "Comment is required"
            }, status=400)

        user = request.env.user

        request.env['mail.message'].sudo().create({
            'model': 'product.product',
            'res_id': product_id,
            'body': comment,
            'message_type': 'comment',
            'author_id': user.partner_id.id
        })

        return request.make_json_response({
            "success": True
        })


    # Obtener comentarios por producto
    @http.route('/api/products/<int:product_id>/comments', type='http', auth='public', methods=['GET'], csrf=False)
    def get_product_comments(self, product_id):

        comments = request.env['mail.message'].sudo().search([
            ('model', '=', 'product.product'),
            ('res_id', '=', product_id),
            ('message_type', '=', 'comment')
        ], order="create_date desc")

        data = []

        for c in comments:
            data.append({
                "comment_id": c.id,
                "user": c.author_id.name,
                "comment": c.body,
                "date": c.create_date
            })

        return request.make_json_response({
            "product_id": product_id,
            "total_comments": len(data),
            "comments": data
        })


    # Obtener todos los comentarios
    @http.route('/api/comments', type='http', auth='public', methods=['GET'], csrf=False)
    def get_all_comments(self):

        comments = request.env['mail.message'].sudo().search([
            ('model', '=', 'product.product'),
            ('message_type', '=', 'comment')
        ], order="create_date desc")

        data = []

        for c in comments:
            data.append({
                "comment_id": c.id,
                "product_id": c.res_id,
                "user": c.author_id.name,
                "comment": c.body,
                "date": c.create_date
            })

        return request.make_json_response({
            "total_comments": len(data),
            "comments": data
        })