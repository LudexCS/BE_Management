import {DiscountRequestDto, DiscountResponseDto} from "../dto/discount.dto";
import {registerDiscount, registerReduction} from "../service/discount.service";
import {ReductionRequestDto} from "../dto/reduction.dto";

export async function registerDiscountControl(discountDto: DiscountRequestDto): Promise<DiscountResponseDto> {
    return await registerDiscount(discountDto);
}

export async function registerReductionControl(reductionDto: ReductionRequestDto): Promise<DiscountResponseDto[]> {
    return await registerReduction(reductionDto);
}