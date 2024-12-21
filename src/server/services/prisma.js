import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addToWaitlist(data) {
  try {
    const entry = await prisma.waitlistEntry.create({
      data: {
        email: data.email,
        role: data.role,
      },
    });
    return { success: true, data: entry };
  } catch (error) {
    if (error.code === 'P2002') {
      return {
        success: false,
        error: 'This email is already on the waitlist',
      };
    }
    return {
      success: false,
      error: 'Failed to add to waitlist',
    };
  }
}

export async function getWaitlistEntries() {
  try {
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: entries };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch waitlist entries',
    };
  }
}

export async function removeFromWaitlist(id) {
  try {
    await prisma.waitlistEntry.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    if (error.code === 'P2025') {
      return {
        success: false,
        error: 'Entry not found',
      };
    }
    return {
      success: false,
      error: 'Failed to remove from waitlist',
    };
  }
}

export async function getWaitlistStats() {
  try {
    const total = await prisma.waitlistEntry.count();
    const lastWeek = await prisma.waitlistEntry.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    return {
      success: true,
      data: {
        total,
        lastWeek,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch waitlist stats',
    };
  }
}
