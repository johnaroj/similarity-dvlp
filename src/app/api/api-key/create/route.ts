import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const handler = async () => {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized to perform this action",
          createdApiKey: null,
        },
        { status: 401 }
      );
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    });

    if (existingApiKey) {
      return NextResponse.json(
        {
          error: "You already have a valid API Key",
        },
        { status: 400 }
      );
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return NextResponse.json({ error: null, createdApiKey });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, createdApiKey: null },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", createdApiKey: null },
      { status: 500 }
    );
  }
};

export { handler as GET };
