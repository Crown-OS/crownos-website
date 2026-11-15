import { Bell01 } from "@untitledui/icons/Bell01";
import { Camera01 } from "@untitledui/icons/Camera01";
import { Clipboard } from "@untitledui/icons/Clipboard";
import { Phone01 } from "@untitledui/icons/Phone01";
import { PhoneCall01 } from "@untitledui/icons/PhoneCall01";
import { Send01 } from "@untitledui/icons/Send01";
import { Tablet01 } from "@untitledui/icons/Tablet01";
import { Wifi } from "@untitledui/icons/Wifi";
import type { CrownLinkFeatureId } from "@/data/crownlink";

export const CROWNLINK_FEATURE_ICONS = {
  clipboard: Clipboard,
  camera: Camera01,
  "remote-phone": Phone01,
  "file-sharing": Send01,
  notifications: Bell01,
  "second-screen": Tablet01,
  hotspot: Wifi,
  "call-bridge": PhoneCall01,
} satisfies Record<CrownLinkFeatureId, unknown>;
