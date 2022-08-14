export class CreateOperationDto{
  
              @IsOptional()
              @IsString({ message: '"string name" must be a string '})
              string name:string;
            ,
              @IsOptional()
              @IsString({ message: '" string description" must be a string '})
               string description:string;
            ,
              @IsOptional()
              @IsString({ message: '" value decimal" must be a string '})
               value decimal:string;
            ,
              @IsOptional()
              @IsString({ message: '" categoryId UUID" must be a string '})
               categoryId UUID:string;
            
}