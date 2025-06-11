import {DiscountRequestDto, DiscountResponseDto} from "../dto/discount.dto";
import {registerDiscount} from "../service/discount.service";

export async function registerDiscountControl(discountDto: DiscountRequestDto): Promise<DiscountResponseDto> {
    return await registerDiscount(discountDto);
}