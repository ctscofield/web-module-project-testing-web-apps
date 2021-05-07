import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/Contact Form/);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const fName = screen.getByLabelText(/First Name*/i);
    userEvent.type(fName, "Cory");
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        expect(screen.queryByText(/Error: firstName must have at least 5 characters./i));
    })    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        expect(screen.queryByText(/Error: firstName is a required field./i));
        expect(screen.queryByText(/Error: lastName is a required field./));
        expect(screen.queryByText(/Error: email is a required field./));
    })    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const fName = screen.getByLabelText(/First Name*/i);
    userEvent.type(fName, "Hector");
    const lName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lName, "Helix");
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        expect(screen.queryByText(/Error: email is a required field./));
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "HectorHelix.aol");
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        expect(screen.queryByText(/Error: email must be a valid email address./i));
    });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        expect(screen.queryByText(/Error: lastName is a required field./i));
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const fName = screen.getByLabelText(/First Name*/i);
    userEvent.type(fName, "Hector");
    const lName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lName, "Helix");
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "HectorHelix@aol.com");
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        const fNameDisplay = screen.queryByText("Hector");
        const lNameDisplay = screen.queryByText("Helix");
        const eDisplay = screen.queryByText("HectorHelix@aol.com");
        const mDisplay = screen.queryByText("Message:");
        expect(fNameDisplay).toBeInTheDocument();
        expect(lNameDisplay).toBeInTheDocument();
        expect(eDisplay).toBeInTheDocument();
        expect(mDisplay).toBeFalsy();
        expect(mDisplay).not.toBeTruthy();
    });
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const fName = screen.getByLabelText(/First Name*/i);
    userEvent.type(fName, "Hector");
    const lName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lName, "Helix");
    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "HectorHelix@aol.com");
    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "LAST TEST WOOHOO!!!");
    const button = screen.getByRole("button");
    userEvent.click(button);
    waitFor(async () => {
        const fNameDisplay = screen.queryByText("Hector");
        const lNameDisplay = screen.queryByText("Helix");
        const eDisplay = screen.queryByText("HectorHelix@aol.com");
        const mDisplay = screen.queryAllByText("LAST TEST WOOHOO!!!");
        expect(fNameDisplay).toBeInTheDocument();
        expect(lNameDisplay).toBeInTheDocument();
        expect(eDisplay).toBeInTheDocument();
        expect(mDisplay).toBeTruthy();      
    });
});