import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main() {
  // Create EventActions
  const eventAction1 = await prisma.eventAction.create({
    data: {
      object: 'event_action',
      name: 'user.login_succeeded'
    }
  });

  const eventAction2 = await prisma.eventAction.create({
    data: {
      object: 'event_action',
      name: 'user.logout'
    }
  });

  // Create Metadata
  const metadata1 = await prisma.metadata.create({
    data: {
      redirect: '/setup',
      description: 'User login succeeded.',
      xRequestId: 'req_W1Y13QOHMI5H'
    }
  });

  const metadata2 = await prisma.metadata.create({
    data: {
      redirect: '/logout',
      description: 'User logout succeeded.',
      xRequestId: 'req_K2L15PQJK9Y3'
    }
  });

  // Create Events
  const event1 = await prisma.event.create({
    data: {
      object: 'event',
      actor_id: 'user_3VG74289PUA2',
      actor_name: 'Ali Salah',
      group: 'instatus.com',
      actionId: eventAction1.id,
      target_id: 'user_DOKVD1U3L030',
      target_name: 'ali@instatus.com',
      location: '105.40.62.95',
      occurred_at: new Date(),
      metadataId: metadata1.id
    }
  });

  const event2 = await prisma.event.create({
    data: {
      object: 'event',
      actor_id: 'user_4BL3P5T67QW9',
      actor_name: 'Ahmed Magdy',
      group: 'example.com',
      actionId: eventAction2.id,
      target_id: 'user_XYZ456ABC789',
      target_name: 'ahmed@instatus.com',
      location: '192.168.1.1',
      occurred_at: new Date(),
      metadataId: metadata2.id
    }
  });
}
