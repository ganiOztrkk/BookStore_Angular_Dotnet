using AutoMapper;
using BookStoreServer.WebApi.Dtos;
using BookStoreServer.WebApi.Models;

namespace BookStoreServer.WebApi.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterDto, User>().ReverseMap();
        CreateMap<CreateShoeDto, Shoe>().ReverseMap();
        CreateMap<UpdateShoeDto, Shoe>().ReverseMap();
        CreateMap<GetOrdersDto, Order>().ReverseMap();
    }
}