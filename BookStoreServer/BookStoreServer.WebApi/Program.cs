var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(cfr =>
{
    cfr.AddDefaultPolicy(p => p
        .AllowAnyOrigin() // yazdıgımız endpointler
        .AllowAnyMethod() // get - post vs
        .AllowAnyHeader()); 
});
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();