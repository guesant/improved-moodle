import { IDetectedRoom } from "../../typings/ISettings";
import StorageSettingsService from "../../services/StorageSettingsService";

export enum RuntimeMessageType {
  NEW_ROOM_DETECTED,
}

export type IRuntimeMessage = {
  type: RuntimeMessageType;
  payload: any;
};

async function handleRuntimeMessage({ payload, type }: IRuntimeMessage) {
  switch (type) {
    case RuntimeMessageType.NEW_ROOM_DETECTED: {
      const detectedRoom = payload as IDetectedRoom;

      const notificationId = await browser.notifications.create({
        type: "basic",
        title: "Um novo ambiente foi detectado",
        message: `Deseja adicionar o ambiente "${detectedRoom.name}" ?`,
        iconUrl: (browser.extension as any).getURL("icons/icon.png"),
        ...{ buttons: [{ title: "Adicionar" }, { title: "Mais Tarde" }] },
      });

      enum NotificationButtons {
        ADD,
        LATER,
      }

      await browser.notifications.onButtonClicked.addListener(
        async (eventId, buttonIndex) => {
          if (eventId === notificationId) {
            switch (buttonIndex) {
              case NotificationButtons.ADD: {
                await StorageSettingsService.handleDetectedRoomAcceptRequest(
                  detectedRoom
                );
                break;
              }
              case NotificationButtons.LATER: {
                break;
              }
            }
          }
        }
      );
    }
  }
}

browser.runtime.onMessage.addListener(handleRuntimeMessage);
