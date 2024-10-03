from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('cliente', 'Cliente'),
        ('prestador', 'Prestador de Servicios'),
        ('administrador', 'Administrador'),
    )
    
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='cliente')
    
    def __str__(self):
        return f'{self.username} ({self.role})'
