import { ListSubheader, styled } from "@mui/material";

interface NavGroupProps {
  item: {
    subheader: string;
  };
}

const NavGroup = ({ item }: NavGroupProps) => {
  const ListSubheaderStyled = styled(ListSubheader)(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1),
    padding: "0 14px",
    color: theme.palette.grey[500],
    backgroundColor: "transparent",
    lineHeight: "1.5",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    "&::after": {
      content: '""',
      flex: 1,
      height: "1px",
      backgroundColor: theme.palette.divider,
    },
  }));

  return (
    <ListSubheaderStyled disableSticky>
      {item.subheader}
    </ListSubheaderStyled>
  );
};

export default NavGroup;
