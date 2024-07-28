import { renderHook, act, waitFor } from '@testing-library/react';
import { UploadProvider } from '../context/UploadContext';
import useLanguageFile from './useLanguageFile';

// Mock dynamic imports for language JSON files
jest.mock('../languages/en/general.json', () => ({
    home: [
        {
            toast: "PDF has been downloaded.",
            title: "PDF Generator",
            subtitle: "Upload a message and an image to generate your PDF file.",
            start: "Get started"
        }
    ],
    textarea: [
        {
            characters: "characters left",
            allowed: "No more characters allowed",
            placeholder: "Text goes here...",
            label: "1) Add your text"
        }
    ]
}), { virtual: true });

jest.mock('../languages/fr/general.json', () => ({
    home: [
        {
            toast: "Le PDF a été téléchargé.",
            title: "Générateur de PDF",
            subtitle: "Téléchargez un message et une image pour générer votre fichier PDF.",
            start: "Commencer"
        }
    ],
    textarea: [
        {
            characters: "caractères restants",
            allowed: "Plus de caractères autorisés",
            placeholder: "Le texte va ici...",
            label: "1) Ajoutez votre texte"
        }
    ]
}), { virtual: true });

describe('useLanguageFile hook', () => {
    test('fetches correct content for "home" in "en" language', async () => {
        const { result } = renderHook(() => useLanguageFile('home'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        await waitFor(() => {
            expect(result.current).toEqual({
                toast: "PDF has been downloaded.",
                title: "PDF Generator",
                subtitle: "Upload a message and an image to generate your PDF file.",
                start: "Get started"
            });
        });
    });

    test('fetches correct content for "textarea" in "en" language', async () => {
        const { result } = renderHook(() => useLanguageFile('textarea'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        await waitFor(() => {
            expect(result.current).toEqual({
                characters: "characters left",
                allowed: "No more characters allowed",
                placeholder: "Text goes here...",
                label: "1) Add your text"
            });
        });
    });

    test('handles errors when the content key is missing', async () => {
        const { result } = renderHook(() => useLanguageFile('nonexistent'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        await waitFor(() => {
            expect(result.current).toBeNull(); // Should be null due to missing content
        });
    });

    test('handles errors when the language file or content is missing', async () => {
        // Mock to throw error for missing file
        jest.mock('../languages/en/general.json', () => {
            throw new Error('File not found');
        }, { virtual: true });

        const { result } = renderHook(() => useLanguageFile('home'), {
            wrapper: ({ children }) => <UploadProvider>{children}</UploadProvider>
        });

        await waitFor(() => {
            expect(result.current).toBeNull(); // Should be null due to file loading error
        });
    });
});
