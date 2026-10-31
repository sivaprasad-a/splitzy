import { Avatar, AvatarGroup, Typography } from "@mui/material";

import { getMember } from "@/lib/domain/mock-data";
import { BRAND_TINT } from "@/lib/theme/theme";

export function MemberAvatars({ memberIds, max = 4 }: { memberIds: string[]; max?: number }) {
  return (
    <AvatarGroup
      max={max}
      sx={{
        justifyContent: "flex-start",
        "& .MuiAvatar-root": {
          width: 28,
          height: 28,
          fontSize: 12,
          bgcolor: BRAND_TINT,
          color: "primary.main",
          border: "2px solid",
          borderColor: "background.paper",
        },
      }}
    >
      {memberIds.map((id) => {
        const member = getMember(id);
        return (
          <Avatar key={id} alt={member?.name}>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {member?.initials ?? "?"}
            </Typography>
          </Avatar>
        );
      })}
    </AvatarGroup>
  );
}
