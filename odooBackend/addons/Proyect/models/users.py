from odoo import fields, models

class ProyectAppUser(models.Model):
    _name = 'billnova.user'
    _description = 'Proyect App User'

    name = fields.Char(string='Nombre')
    email = fields.Char(string='Email')
    phone = fields.Char(string='Telefono')
    address = fields.Char(string='Direccion')
    role = fields.Selection([('admin', 'Admin'), ('user', 'Usuario'), ('seller', 'Vendedor')], string='Rol', default='user')
    is_mobile_user = fields.Boolean(string='Es Usuario Móvil')
    res_user_id = fields.Many2one('res.users', required=True, ondelete='cascade')
