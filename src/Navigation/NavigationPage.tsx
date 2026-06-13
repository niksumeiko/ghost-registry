import {Link} from 'react-router-dom';
import {Layout, Logo, Nav, NavItem, Stripe} from '@design-system';

export const NavigationPage = () =>
    (
        <Layout>
            <Stripe>
                <Logo variant="xl"/>
            </Stripe>
            <Nav>
                <NavItem>
                    <Link to="/restricted">Targets</Link>
                </NavItem> <NavItem>
                <Link data-testid="next-target" to="/next-target">Next Target</Link>
            </NavItem>
                <NavItem>
                    <Link to="/restricted">Ghost Registry</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Trap Inventory</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Containment Unit</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Sightings Log</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Classifications</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Field Reports</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Crew Roster</Link>
                </NavItem>
                <NavItem>
                    <Link to="/restricted">Client Invoices</Link>
                </NavItem>
            </Nav>
        </Layout>
    );
