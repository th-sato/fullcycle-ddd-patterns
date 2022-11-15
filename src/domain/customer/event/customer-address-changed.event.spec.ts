import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendConsoleLogWhenAddressIsChangedHandler from "./handler/send-console-log-when-address-is-changed.handler";

describe("Customer address changed event tests", () => {

    it("Should execute handler when has a event of customer address changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toMatchObject([eventHandler]);

        const address = new Address(
            "Street 1",
            1,
            "12345678-900",
            "City",
        );
        const customerChangeAdressEvent = new CustomerAddressChangedEvent({
            id: "C1",
            name: "Customer 1",
            address: address,
        });

        eventDispatcher.notify(customerChangeAdressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })
});