import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	updateState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	updateState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedState, setSelectedState] = useState(currentState);

	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const handleReset = (evt: FormEvent) => {
		evt.preventDefault();
		updateState(defaultArticleState);
		setSelectedState(defaultArticleState);
	};

	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		updateState(selectedState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={45} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={selectedState.fontFamilyOption}
						onChange={(selected: OptionType) => {
							setSelectedState({
								...selectedState,
								fontFamilyOption: selected,
							});
						}}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						name={'1'}
						onChange={(selected: OptionType) => {
							setSelectedState({
								...selectedState,
								fontSizeOption: selected,
							});
						}}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={selectedState.fontColor}
						onChange={(selected: OptionType) => {
							setSelectedState({
								...selectedState,
								fontColor: selected,
							});
						}}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={selectedState.backgroundColor}
						onChange={(selected: OptionType) => {
							setSelectedState({
								...selectedState,
								backgroundColor: selected,
							});
						}}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={selectedState.contentWidth}
						onChange={(selected: OptionType) => {
							setSelectedState({
								...selectedState,
								contentWidth: selected,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
