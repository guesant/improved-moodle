import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useContextSelector } from "use-context-selector";
import { routes } from "../../Routes";
import { ViewRoomCoursesContext } from "../ViewRoomCourses/ViewRoomCoursesContext";
import { useCurrentRoomId } from "../ViewRoom/ViewRoomContext";

const ViewRoomCoursesSearchHeaderGoBack = () => {
  const history = useHistory();
  const id = useCurrentRoomId(false);

  const setSearchText = useContextSelector(
    ViewRoomCoursesContext,
    ({ setSearchText }) => setSearchText
  );

  const goBack = useCallback(() => {
    setSearchText("");
    history.push(routes.viewRoom({ id }));
  }, [history, id, setSearchText]);

  return (
    <IconButton onClick={goBack} color="inherit">
      <ArrowBackIcon />
    </IconButton>
  );
};

export default ViewRoomCoursesSearchHeaderGoBack;
