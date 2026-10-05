/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { h } from '@stencil/core';
import {
  iconError,
  iconInfo,
  iconSuccess,
  iconWarning,
} from '@siemens/ix-icons/icons';
import { a11yBoolean } from '../utils/a11y';

/**
 * CSS parts of `ix-field-wrapper` that form components forward to their own host
 * via `exportparts`.
 */
export const fieldWrapperExportParts =
  'label, required-indicator, helper-text, helper-text-icon';

export function hasAnyText({
  invalidText,
  isInvalid,
  warningText,
  isWarning,
  infoText,
  isInfo,
  validText,
  isValid,
  helperText,
}: {
  invalidText?: string;
  isInvalid?: boolean;
  warningText?: string;
  isWarning?: boolean;
  infoText?: string;
  isInfo?: boolean;
  validText?: string;
  isValid?: boolean;
  helperText?: string;
}) {
  return !!(
    (isInvalid && invalidText?.trim()) ||
    (isWarning && warningText?.trim()) ||
    (isInfo && infoText?.trim()) ||
    (isValid && validText?.trim()) ||
    helperText?.trim()
  );
}

export function resolveTextFromValidationState(
  props: Readonly<{
    isInvalid: boolean;
    invalidText?: string;
    isWarning: boolean;
    warningText?: string;
    isInfo: boolean;
    infoText?: string;
    isValid: boolean;
    validText?: string;
    helperText?: string;
  }>
) {
  if (!hasAnyText(props)) return '';

  if (props.isInvalid && props.invalidText && props.invalidText.trim() !== '') {
    return props.invalidText;
  }

  if (props.isWarning && props.warningText && props.warningText.trim() !== '') {
    return props.warningText;
  }

  if (props.isInfo && props.infoText && props.infoText.trim() !== '') {
    return props.infoText;
  }

  if (props.isValid && props.validText && props.validText.trim() !== '') {
    return props.validText;
  }

  return props.helperText || '';
}

export function HelperText(
  props: Readonly<{
    isInvalid: boolean;
    invalidText?: string;
    isWarning: boolean;
    warningText?: string;
    isInfo: boolean;
    infoText?: string;
    isValid: boolean;
    validText?: string;
    helperText?: string;
  }>
) {
  if (!hasAnyText(props)) return null;
  if (props.isInvalid && props.invalidText && props.invalidText.trim() !== '') {
    return (
      <ix-typography
        textColor="alarm"
        class="bottom-text"
        part="helper-text"
        format="body-paragraph"
      >
        <ix-icon
          aria-hidden={a11yBoolean(!!props.invalidText)}
          class="text-icon invalid"
          part="helper-text-icon"
          name={iconError}
          size="16"
        ></ix-icon>
        {props.invalidText}
      </ix-typography>
    );
  }

  if (props.isWarning && props.warningText && props.warningText.trim() !== '') {
    return (
      <ix-typography
        textColor="std"
        class="bottom-text"
        part="helper-text"
        format="body-paragraph"
      >
        <ix-icon
          aria-hidden={a11yBoolean(!!props.warningText)}
          class="text-icon warning"
          part="helper-text-icon"
          name={iconWarning}
          size="16"
        ></ix-icon>
        {props.warningText}
      </ix-typography>
    );
  }

  if (props.isInfo && props.infoText && props.infoText.trim() !== '') {
    return (
      <ix-typography
        textColor="std"
        class="bottom-text"
        part="helper-text"
        format="body-paragraph"
      >
        <ix-icon
          aria-hidden={a11yBoolean(!!props.infoText)}
          class="text-icon info"
          part="helper-text-icon"
          name={iconInfo}
          size="16"
        ></ix-icon>
        {props.infoText}
      </ix-typography>
    );
  }

  if (props.isValid && props.validText && props.validText.trim() !== '') {
    return (
      <ix-typography
        textColor="std"
        class="bottom-text"
        part="helper-text"
        format="body-paragraph"
      >
        <ix-icon
          aria-hidden={a11yBoolean(!!props.validText)}
          class="text-icon valid"
          part="helper-text-icon"
          name={iconSuccess}
          size="16"
        ></ix-icon>
        {props.validText}
      </ix-typography>
    );
  }

  return (
    props.helperText &&
    props.helperText.trim() !== '' && (
      <ix-typography
        class="bottom-text"
        part="helper-text"
        format="body-paragraph"
        textColor="soft"
      >
        {props.helperText}
      </ix-typography>
    )
  );
}
