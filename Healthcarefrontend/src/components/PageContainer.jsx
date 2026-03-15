import { Container, Paper } from "@mui/material";

function PageContainer({ children }) {

  return (

    <Container maxWidth={false} sx={{ mt: 5 }}>

      <Paper elevation={3} sx={{ p: 5 }}>

        {children}

      </Paper>

    </Container>

  );

}

export default PageContainer;