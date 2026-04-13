from odoo import http
from odoo.http import request, Response
import logging
import json

_logger = logging.getLogger(__name__)


class ProductRatingController(http.Controller):

    @http.route(
        '/api/products/<int:product_id>/rating',
        type='http',
        auth='public',
        methods=['POST'],
        csrf=False
    )
    def create_rating(self, product_id, **kwargs):

        _logger.info("POST rating called product_id=%s kwargs=%s", product_id, kwargs)

        rating = kwargs.get("rating")

        if rating is None:
            _logger.warning("Rating not received in request")
            return {"error": "rating missing"}

        rating = float(rating)

        if rating < 0 or rating > 5:
            return {"error": "Rating must be between 0 and 5"}

        user = request.env.user

        model = request.env['ir.model']._get('product.product')

        rating_record = request.env['rating.rating'].sudo().create({
            'res_model_id': model.id,
            'res_id': product_id,
            'rated_partner_id': request.env.user.partner_id.id,
            'rating': float(rating),
        })

        _logger.info("Rating created ID=%s res_model=%s res_id=%s rating=%s",
                     rating_record.id,
                     rating_record.res_model,
                     rating_record.res_id,
                     rating_record.rating)

        return Response(
            json.dumps({
                "success": True,
                "rating_id": rating_record.id
            }),
            content_type="application/json"
        )

    @http.route(
        '/api/products/<int:product_id>/rating',
        type='http',
        auth='public',
        methods=['GET'],
        csrf=False
    )
    def get_product_rating(self, product_id):

        _logger.info("GET rating called product_id=%s", product_id)

        ratings = request.env['rating.rating'].sudo().search([
            ('res_model', '=', 'product.product'),
            ('res_id', '=', product_id)
        ])

        _logger.info("Found ratings ids=%s", ratings.ids)

        avg = 0
        if ratings:
            values = ratings.mapped('rating')
            _logger.info("Rating values=%s", values)
            avg = sum(values) / len(values)

        data = {
            "product_id": product_id,
            "average_rating": avg,
            "total_ratings": len(ratings)
        }

        _logger.info("Response data=%s", data)

        return request.make_json_response(data)