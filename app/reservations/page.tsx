import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }
    const reservations = await getReservations({
        authorId: currentUser.id,
    });
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you havent reservations on your property."
                />
            </ClientOnly>
        );
    } else {
        return (
            <ClientOnly>
                <ReservationsClient
                    currentUser={currentUser}
                    reservations={reservations}
                />
            </ClientOnly>
        );
    }
};

export default ReservationsPage;
