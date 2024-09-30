from django.urls import path
from . import views
from .views import CustomLoginView

urlpatterns = [
    # Ruta para iniciar sesion
    path('login/', CustomLoginView.as_view(), name='login'),

    # Rutas para los dashboards de cada rol
    path('dashboard/admin/', views.admin_dashboard, name='admin_dashboard'),
    path('dashboard/prestador/', views.prestador_dashboard, name='prestador_dashboard'),
    path('dashboard/cliente/', views.cliente_dashboard, name='cliente_dashboard'),
]
