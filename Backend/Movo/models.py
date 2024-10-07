from django.contrib.auth.models import AbstractUser
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.contrib import messages
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('cliente', 'Cliente'),
        ('prestador', 'Prestador'),
        ('administrador', 'Administrador'),
    )
    
    nombres = models.CharField(max_length=40)
    apellidos = models.CharField(max_length=40)
    rut = models.CharField(max_length=12)
    genero = models.CharField(max_length=20)
    email = models.EmailField()
    rol = models.CharField(max_length=15, choices=ROLE_CHOICES, default='cliente')
    password = models.CharField(max_length=128)
    fecha_registro = models.DateField(null=True, blank=True)

class Formulario(models.Model):
    Nombres = models.CharField(max_length=40)
    Apellidos = models.CharField(max_length=40)
    Correo_Electronico = models.EmailField()
    Telefono = models.CharField(max_length=15)
    Motivo = models.CharField(max_length=50)
    Mensaje = models.CharField(max_length=200)
    
def crear_usuario(request):
    if request.method == 'POST':
        # Recoger datos del formulario
        nombres = request.POST['nombres']
        apellidos = request.POST['apellidos']
        rut = request.POST['rut']
        genero = request.POST['genero']
        email = request.POST['email']
        rol = request.POST['rol']
        password = request.POST['password']
        fecha_registro = request.POST['fecha_registro']
        
        # Crear un nuevo usuario
        nuevo_usuario = User(
            nombres=nombres,
            apellidos=apellidos,
            rut=rut,
            genero=genero,
            email=email,
            rol=rol,
            password=password,
            fecha_registro=fecha_registro
        )
        nuevo_usuario.save()
        return redirect('lista_usuarios')  # Redirigir a la lista de usuarios

    #return render(request, 'crear_usuario.html') ---> html de la pagina

def lista_usuarios(request):
    usuarios = User.objects.all()  # Obtener todos los usuarios
    return render(request, 'lista_usuarios.html', {'usuarios': usuarios})

def editar_usuario(request, usuario_id):
    usuario = get_object_or_404(id=usuario_id)
    
    if request.method == 'POST':
        usuario.nombres = request.POST['nombres']
        usuario.apellidos = request.POST['apellidos']
        usuario.rut = request.POST['rut']
        usuario.genero = request.POST['genero']
        usuario.email = request.POST['email']
        usuario.rol = request.POST['rol']
        usuario.password = request.POST['password']
        usuario.fecha_registro = request.POST['fecha_registro']
        usuario.save()
        return redirect('lista_usuarios')

    #return render(request, 'editar_usuario.html', {'usuario': usuario})--> html de la pagina

def eliminar_usuario(request, usuario_id):
    usuario = User.objects.get(id=usuario_id)
    usuario.delete()
    messages.success(request, 'Usuario eliminado correctamente.')
    return redirect('lista_usuarios')


#FORMULARIO

def crear_formulario(request):
    if request.method == 'POST':
        # Recoger datos del formulario
        nombres = request.POST['nombres']
        apellidos = request.POST['apellidos']
        correo_electronico = request.POST['correo_electronico']
        telefono = request.POST['telefono']
        motivo = request.POST['motivo']
        mensaje = request.POST['mensaje']

        # Crear un nuevo formulario
        nuevo_formulario = Formulario(
            Nombres=nombres,
            Apellidos=apellidos,
            Correo_Electronico=correo_electronico,
            Telefono=telefono,
            Motivo=motivo,
            Mensaje=mensaje
        )
        nuevo_formulario.save()
        return redirect('lista_formularios')  # Redirigir a la lista de formularios

    return render(request, 'crear_formulario.html')


def lista_formularios(request):
    formularios = Formulario.objects.all()  # Obtener todos los formularios
    return render(request, 'lista_formularios.html', {'formularios': formularios})


def editar_formulario(request, formulario_id):
    formulario = Formulario.objects.get(id=formulario_id)
    
    if request.method == 'POST':
        formulario.Nombres = request.POST['nombres']
        formulario.Apellidos = request.POST['apellidos']
        formulario.Correo_Electronico = request.POST['correo_electronico']
        formulario.Telefono = request.POST['telefono']
        formulario.Motivo = request.POST['motivo']
        formulario.Mensaje = request.POST['mensaje']
        formulario.save()
        return redirect('lista_formularios')

    return render(request, 'editar_formulario.html', {'formulario': formulario})


def eliminar_formulario(request, formulario_id):
    formulario = Formulario.objects.get(id=formulario_id)
    formulario.delete()
    return redirect('lista_formularios')
