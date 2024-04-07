import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {FieldApi, useForm} from '@tanstack/react-form';
import {z} from 'zod';
import {zodValidator} from '@tanstack/zod-form-adapter';

import {useStorage} from '../store';

const styles = StyleSheet.create({
  viewStyle: {
    margin: 8,
    padding: 8,
  },
  labelText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 10,
  },
  ratingViewStyle: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  submittingIndicator: {
    flex: 1,
  },
});

function FieldInfo({field}: {field: FieldApi<any, any, any, any>}) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <Text style={styles.errorText}>{field.state.meta.touchedErrors}</Text>
      ) : null}
      <Text>{field.state.meta.isValidating ? 'Validating...' : null}</Text>
    </>
  );
}

const FeedbackScreen: React.FC = () => {
  const {t} = useTranslation();
  const storage = useStorage();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      rating: 1,
      feedback: '',
    },
    validatorAdapter: zodValidator,
    onSubmit: async ({value}) => {
      const id = Math.random().toString(36).substring(7);
      await storage.save({key: 'feedback', id, data: value});
      const submittedData = await storage.getAllDataForKey('feedback');
      console.log(submittedData);

      Toast.show({
        type: 'success',
        text1: t('feedback.successTitle'),
        text2: t('feedback.successBody'),
      });
    },
  });

  return (
    <View>
      <form.Field
        name="name"
        validators={{
          onChange: z.string().min(3, t('feedback.nameMinLength')),
        }}
        children={field => (
          <View style={styles.viewStyle}>
            <Text style={styles.labelText}>{t('feedback.nameField')}</Text>
            <TextInput
              style={styles.inputStyle}
              value={field.getValue()}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
            />
            <FieldInfo field={field} />
          </View>
        )}
      />
      <form.Field
        name="email"
        validators={{
          onChange: z.string().email(t('feedback.emailInvalid')),
        }}
        children={field => (
          <View style={styles.viewStyle}>
            <Text style={styles.labelText}>{t('feedback.emailField')}</Text>
            <TextInput
              style={styles.inputStyle}
              value={field.getValue()}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
            />
            <FieldInfo field={field} />
          </View>
        )}
      />
      <form.Field
        name="rating"
        children={field => (
          <View style={styles.viewStyle}>
            <Text style={styles.labelText}>{t('feedback.ratingField')}</Text>
            <View style={styles.ratingViewStyle}>
              {Array.from({length: 5}).map((_, index) => (
                <Icon
                  key={index}
                  color="black"
                  size={24}
                  name={field.getValue() >= index + 1 ? 'star' : 'staro'}
                  onPress={() => field.setValue(index + 1)}
                />
              ))}
            </View>
          </View>
        )}
      />
      <form.Field
        name="feedback"
        validators={{
          onChange: z.string().optional(),
        }}
        children={field => (
          <View style={styles.viewStyle}>
            <Text style={styles.labelText}>{t('feedback.feedbackField')}</Text>
            <TextInput
              style={styles.inputStyle}
              multiline={true}
              numberOfLines={5}
              value={field.getValue()}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
            />
            <FieldInfo field={field} />
          </View>
        )}
      />
      {form.state.isSubmitting ? (
        <ActivityIndicator
          style={styles.submittingIndicator}
          size="large"
          color="#0000ff"
        />
      ) : (
        <Button onPress={form.handleSubmit} title={t('feedback.submit')} />
      )}
    </View>
  );
};

export default FeedbackScreen;
