package in.sanjeetdutt.bookmyshow.model;

import in.sanjeetdutt.bookmyshow.enums.PaymentChannel;
import in.sanjeetdutt.bookmyshow.enums.PaymentMode;
import in.sanjeetdutt.bookmyshow.enums.PaymentStatus;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment extends BaseModel {
    PaymentMode paymentMode;
    PaymentChannel paymentChannel;
    Double amount;
    PaymentStatus paymentStatus;
    String refNo;
}
