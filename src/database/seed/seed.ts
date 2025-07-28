
import { AppDataSource } from "../config/planning.connection";
import { Orderline } from "../../entities/orderlines/orderlines";
import { Clients } from "../../entities/client/clients";
import { Orderheads } from "../../entities/orderhead/orderheads";

async function seed() {
    await AppDataSource.initialize();

    const orderHeadRepo = AppDataSource.getRepository(Orderheads);
    const orderLineRepo = AppDataSource.getRepository(Orderline);
    const clientRepo = AppDataSource.getRepository(Clients);

    const client1 = clientRepo.create({
        code: 'CL001',
        name: 'Client 1'
    });
    const client2 = clientRepo.create({
        code: 'CL002',
        name: 'Client 2'
    });
    await clientRepo.save([client1, client2]);

    const orderHead1 = orderHeadRepo.create({
        order_id: 'P001',
        code: 'P001',
        confirmDate: new Date,
        Yarncomp: 'COTON',
        Yarncount: '30/1',
        yarn_eta: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        yarn_etd: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        clients: client1,
    });

    const orderHead2 = orderHeadRepo.create({
        order_id: 'PO002',
        code: 'PO002',
        confirmDate: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        Yarncomp: 'POLYESTER',
        Yarncount: '20/2',
        yarn_eta: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        yarn_etd: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        clients: client2,
    });
    await orderHeadRepo.save([orderHead1, orderHead2]);

    const orderLine1 = orderLineRepo.create({
        shipment: 'SEA',
        request: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        style_code: 'ST001',
        style_description: 'T-shirt Homme',
        status: 'allocated',
        quantity_to_be_shipped: 1000,
        kpa: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        factory1: 'Factory A',
        factory2: 'Factory B',
        machine_type: 'Circular',
        gauge_code: 28,
        orderhead: orderHead2,
    });
    const orderLine2 = orderLineRepo.create({
        shipment: 'SEA',
        request: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        style_code: 'ST002',
        style_description: 'T-shirt Femme',
        status: 'allocated',
        quantity_to_be_shipped: 1000,
        kpa: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        factory1: 'Factory B',
        factory2: 'Factory C',
        machine_type: 'Circular',
        gauge_code: 20,
        orderhead: orderHead2,
    });
    const orderLine3 = orderLineRepo.create({
        shipment: 'SEA',
        request: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        style_code: 'ST003',
        style_description: 'T-shirt Femme',
        status: 'shipped',
        quantity_to_be_shipped: 500,
        kpa: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        factory1: 'Factory B',
        factory2: 'Factory C',
        machine_type: 'Circular',
        gauge_code: 20,
        orderhead: orderHead1,
    });
    const orderLine4 = orderLineRepo.create({
        shipment: 'SEA',
        request: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        style_code: 'ST004',
        style_description: 'T-shirt Homme',
        status: 'shipped',
        quantity_to_be_shipped: 800,
        kpa: randomDate(new Date('2024-01'), new Date('2024-12-31')),
        factory1: 'Factory X',
        factory2: 'Factory Y',
        machine_type: 'Circular',
        gauge_code: 30,
        orderhead: orderHead1,
    });


    await orderLineRepo.save([orderLine1, orderLine2, orderLine3, orderLine4]);

    console.log('✅ Seed terminé');
    await AppDataSource.destroy();

    function randomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

}

seed().catch((err) => {
    console.error('❌ Seed échoué', err);
});