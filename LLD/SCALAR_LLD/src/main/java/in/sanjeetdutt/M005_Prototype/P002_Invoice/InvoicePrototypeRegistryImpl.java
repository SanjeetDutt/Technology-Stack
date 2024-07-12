package in.sanjeetdutt.M005_Prototype.P002_Invoice;

import java.util.HashMap;
import java.util.Map;

public class InvoicePrototypeRegistryImpl implements InvoicePrototypeRegistry{

    Map<InvoiceType, Invoice> invoiceMap = new HashMap<>();

    @Override
    public void addPrototype(Invoice invoice) {
        invoiceMap.put(invoice.getType(), invoice);
    }

    @Override
    public Invoice getPrototype(InvoiceType invoiceType) {
        return invoiceMap.get(invoiceType);
    }

    @Override
    public Invoice clone(InvoiceType invoiceType) {
        return getPrototype(invoiceType).cloneObject();
    }
}
