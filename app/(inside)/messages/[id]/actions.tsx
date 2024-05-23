"use server";

import { auth } from "@/edgedb-client";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const { client } = auth.getSession();
  const message = formData.get("message");
  const conversationId = formData.get("conversationId");
  await client.query(
    `
        UPDATE Conversation
        FILTER .id = <uuid>$conversationId
        SET {
            messages += (INSERT Message {
                text := <str>$message,
                author := global current_user
            })
        }
      `,
    { conversationId, message }
  );

  revalidatePath("/conversations");
}
