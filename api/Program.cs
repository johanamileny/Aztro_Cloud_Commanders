using Api.DataContext;
using Api.Repositories;
using Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
//Configurarar autorizacionces
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("ADMIN"));
});
// Configurar JWT
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });
// Configurar PostgreSQL
builder.Services.AddDbContext<AmadeusContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar repositorios y servicios
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>((provider) => {
    var usuarioRepository = provider.GetRequiredService<IUsuarioRepository>();
    var destinoRepository = provider.GetRequiredService<IDestinoRepository>();
    var context = provider.GetRequiredService<AmadeusContext>();
    return new UsuarioService(usuarioRepository, destinoRepository, context);
});
builder.Services.AddScoped<IPreferenciaUsuarioRepository, PreferenciaUsuarioRepository>();
builder.Services.AddScoped<IPreferenciaUsuarioService, PreferenciaUsuarioService>();
builder.Services.AddScoped<IPreferenciaRepository, PreferenciaRepository>();
builder.Services.AddScoped<IPreferenciaService, PreferenciaService>();
builder.Services.AddScoped<IDestinoRepository, DestinoRepository>();
builder.Services.AddScoped<IDestinoService, DestinoService>();
builder.Services.AddScoped<IAuthService, AuthService>();


// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

// Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Amadeus API",
        Version = "v1",
        Description = "API para la gestión de usuarios y preferencias en Amadeus."
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Ingrese el token de acceso con el prefijo 'Bearer'",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


var app = builder.Build();

// Aplicar migraciones automáticamente al iniciar
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AmadeusContext>();
    context.Database.Migrate();

    // Ejecutar seeders automáticamente después de las migraciones
    var seeders = new List<Api.Seeders.ISeeder>
    {
        new Api.Seeders.ContinenteSeeder(),
        new Api.Seeders.DestinoSeeder(),
        new Api.Seeders.PreferenciaSeeder(),
        new Api.Seeders.PreferenciaDestinoSeeder()
    };
    foreach (var seeder in seeders.OrderBy(s => s.Order))
    {
        seeder.SeedAsync(context).GetAwaiter().GetResult();
    }
}

app.UseAuthentication(); // Habilitar autenticación con JWT
app.UseAuthorization();  // Habilitar autorización
app.UseCors("AllowAll");

// Habilitar Swagger en todos los entornos
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    options.RoutePrefix = string.Empty; // Dejar vacío para acceder en la raíz (http://localhost:5220)
});

// Manejo global de excepciones
app.UseExceptionHandler("/error");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();