from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.contrib.auth import login

# Personaliza la vista de inicio de sesion
class CustomLoginView(LoginView):
    template_name = 'login.html'

    def form_valid(self, form):
        # Autenticar al usuario
        login(self.request, form.get_user())
        
        # Obtener el rol del usuario
        role = form.get_user().role
        
        # Redirigir segun el rol
        if role == 'administrador':
            return redirect('admin_dashboard')
        elif role == 'prestador':
            return redirect('prestador_dashboard')
        else:
            return redirect('cliente_dashboard')

@login_required
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

@login_required
def prestador_dashboard(request):
    return render(request, 'prestador_dashboard.html')

@login_required
def cliente_dashboard(request):
    return render(request, 'cliente_dashboard.html')
