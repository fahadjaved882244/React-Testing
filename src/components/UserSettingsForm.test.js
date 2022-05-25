import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { date } from "faker";
import { DefaultPrivacyLevel } from "models";
import UserSettingsForm from "./UserSettingsForm";

function getMockUser() {
    return {
        id: '1',
        uuid: '0003123',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: 's3cret',
        email: 'john@doe.com',
        phoneNumber: '625-316-9882',
        balance: 2131,
        avatar: '1',
        defaultPrivacyLevel: DefaultPrivacyLevel.public,
        createdAt: date,
        modifiedAt: date,
    };
}

test('on initial render, All fields has correct current values', () => {
    const mockUser = getMockUser();
    render(<UserSettingsForm userProfile={mockUser} updateUser={() => { }} />);
    expect(screen.getByPlaceholderText('First Name')).toHaveValue(mockUser.firstName);
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue(mockUser.lastName);
    expect(screen.getByPlaceholderText('Email')).toHaveValue(mockUser.email);
    expect(screen.getByPlaceholderText('Phone Number')).toHaveValue(mockUser.phoneNumber);
});

test('if first name is empty, the save button becomes disabled', async() => {
    const mockUser = getMockUser();
    render(<UserSettingsForm userProfile={mockUser} updateUser={() => { }} />);
    userEvent.clear(screen.getByPlaceholderText('First Name'));
    expect(await screen.findByRole('button', { name: /save/i })).toBeDisabled();
});

test('if last name is empty, the save button becomes disabled', async() => {
    const mockUser = getMockUser();
    render(<UserSettingsForm userProfile={mockUser} updateUser={() => { }} />);
    userEvent.clear(screen.getByPlaceholderText('Last Name'));
    expect(await screen.findByRole('button', { name: /save/i })).toBeDisabled();
});

test('if email is empty, the save button becomes disabled', async() => {
    const mockUser = getMockUser();
    render(<UserSettingsForm userProfile={mockUser} updateUser={() => { }} />);
    userEvent.clear(screen.getByPlaceholderText('Email'));
    expect(await screen.findByRole('button', { name: /save/i })).toBeDisabled();
});

test('if Phone Number is empty, the save button becomes disabled', async() => {
    const mockUser = getMockUser();
    render(<UserSettingsForm userProfile={mockUser} updateUser={() => { }} />);
    userEvent.clear(screen.getByPlaceholderText('Phone Number'));
    expect(await screen.findByRole('button', { name: /save/i })).toBeDisabled();
});




