"use server";

import { auth } from "@/edgedb-client";
import { MAX_MESSAGE_SIZE } from "@/utils/constants";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const { client } = auth.getSession();
  const message = formData.get("message")?.toString();
  if (!message) return;
  const conversationId = formData.get("conversationId");
  const trimmedMessage = message.substring(0, MAX_MESSAGE_SIZE);
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
    { conversationId, message: trimmedMessage }
  );

  revalidatePath("/messages");
}
