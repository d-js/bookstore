package com.oncode.bookstore.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValidator implements ConstraintValidator<ValidEnum, Enum<?>>
{
    private Class<? extends Enum<?>> enumClass;
    
    @Override
    public void initialize(ValidEnum constraintAnnotaion)
    {
        enumClass = constraintAnnotaion.enumClass();
    }
    
    @Override
    public boolean isValid(Enum<?> value, ConstraintValidatorContext context) 
    {
        if(value == null)
        {
            return true;
        }    
        for(Enum<?> enumConstant : enumClass.getEnumConstants())
        {
            if(enumConstant.equals(value))
            {
                return true;
            }
        }
        
        return false;
    }
    
}
