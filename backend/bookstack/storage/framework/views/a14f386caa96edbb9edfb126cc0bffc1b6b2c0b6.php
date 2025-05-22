<?php $__env->startSection('body'); ?>
    <div class="container mt-xl" id="search-system">

        <div class="grid right-focus reverse-collapse gap-xl">
            <div>
                <div>
                    <h5><?php echo e(trans('entities.search_advanced')); ?></h5>

                    <form method="get" action="<?php echo e(url('/search')); ?>">
                        <h6><?php echo e(trans('entities.search_terms')); ?></h6>
                        <input type="text" name="search" value="<?php echo e(implode(' ', $options->searches)); ?>">

                        <h6><?php echo e(trans('entities.search_content_type')); ?></h6>
                        <div class="form-group">

                            <?php
                            $types = explode('|', $options->filters['type'] ?? '');
                            $hasTypes = $types[0] !== '';
                            ?>
                            <?php echo $__env->make('search.parts.type-filter', ['checked' => !$hasTypes || in_array('page', $types), 'entity' => 'page', 'transKey' => 'page'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                            <?php echo $__env->make('search.parts.type-filter', ['checked' => !$hasTypes || in_array('chapter', $types), 'entity' => 'chapter', 'transKey' => 'chapter'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                            <br>
                                <?php echo $__env->make('search.parts.type-filter', ['checked' => !$hasTypes || in_array('book', $types), 'entity' => 'book', 'transKey' => 'book'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                                <?php echo $__env->make('search.parts.type-filter', ['checked' => !$hasTypes || in_array('bookshelf', $types), 'entity' => 'bookshelf', 'transKey' => 'shelf'], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        </div>

                        <h6><?php echo e(trans('entities.search_exact_matches')); ?></h6>
                        <?php echo $__env->make('search.parts.term-list', ['type' => 'exact', 'currentList' => $options->exacts], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

                        <h6><?php echo e(trans('entities.search_tags')); ?></h6>
                        <?php echo $__env->make('search.parts.term-list', ['type' => 'tags', 'currentList' => $options->tags], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

                        <?php if(signedInUser()): ?>
                            <h6><?php echo e(trans('entities.search_options')); ?></h6>

                            <?php $__env->startComponent('search.parts.boolean-filter', ['filters' => $options->filters, 'name' => 'viewed_by_me', 'value' => null]); ?>
                                <?php echo e(trans('entities.search_viewed_by_me')); ?>

                            <?php echo $__env->renderComponent(); ?>
                            <?php $__env->startComponent('search.parts.boolean-filter', ['filters' => $options->filters, 'name' => 'not_viewed_by_me', 'value' => null]); ?>
                                <?php echo e(trans('entities.search_not_viewed_by_me')); ?>

                            <?php echo $__env->renderComponent(); ?>
                            <?php $__env->startComponent('search.parts.boolean-filter', ['filters' => $options->filters, 'name' => 'is_restricted', 'value' => null]); ?>
                                <?php echo e(trans('entities.search_permissions_set')); ?>

                            <?php echo $__env->renderComponent(); ?>
                            <?php $__env->startComponent('search.parts.boolean-filter', ['filters' => $options->filters, 'name' => 'created_by', 'value' => 'me']); ?>
                                <?php echo e(trans('entities.search_created_by_me')); ?>

                            <?php echo $__env->renderComponent(); ?>
                            <?php $__env->startComponent('search.parts.boolean-filter', ['filters' => $options->filters, 'name' => 'updated_by', 'value' => 'me']); ?>
                                <?php echo e(trans('entities.search_updated_by_me')); ?>

                            <?php echo $__env->renderComponent(); ?>
                            <?php $__env->startComponent('search.parts.boolean-filter', ['filters' => $options->filters, 'name' => 'owned_by', 'value' => 'me']); ?>
                                <?php echo e(trans('entities.search_owned_by_me')); ?>

                            <?php echo $__env->renderComponent(); ?>
                        <?php endif; ?>

                        <h6><?php echo e(trans('entities.search_date_options')); ?></h6>
                        <?php echo $__env->make('search.parts.date-filter', ['name' => 'updated_after', 'filters' => $options->filters], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        <?php echo $__env->make('search.parts.date-filter', ['name' => 'updated_before', 'filters' => $options->filters], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        <?php echo $__env->make('search.parts.date-filter', ['name' => 'created_after', 'filters' => $options->filters], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                        <?php echo $__env->make('search.parts.date-filter', ['name' => 'created_before', 'filters' => $options->filters], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

                        <?php if(isset($options->filters['created_by'])): ?>
                            <input type="hidden" name="filters[created_by]" value="<?php echo e($options->filters['created_by']); ?>">
                        <?php endif; ?>
                        <?php if(isset($options->filters['updated_by'])): ?>
                            <input type="hidden" name="filters[updated_by]" value="<?php echo e($options->filters['updated_by']); ?>">
                        <?php endif; ?>

                        <button type="submit" class="button"><?php echo e(trans('entities.search_update')); ?></button>
                    </form>

                </div>
            </div>
            <div>
                <div class="card content-wrap">
                    <h1 class="list-heading"><?php echo e(trans('entities.search_results')); ?></h1>

                    <form action="<?php echo e(url('/search')); ?>" method="GET"  class="search-box flexible hide-over-l">
                        <input value="<?php echo e($searchTerm); ?>" type="text" name="term" placeholder="<?php echo e(trans('common.search')); ?>">
                        <button type="submit"><?php echo icon('search'); ?></button>
                    </form>

                    <h6 class="text-muted"><?php echo e(trans_choice('entities.search_total_results_found', $totalResults, ['count' => $totalResults])); ?></h6>
                    <div class="book-contents">
                        <?php echo $__env->make('entities.list', ['entities' => $entities, 'showPath' => true, 'showTags' => true], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                    </div>

                    <?php if($hasNextPage): ?>
                        <div class="text-right mt-m">
                            <a href="<?php echo e($nextPageLink); ?>" class="button outline"><?php echo e(trans('entities.search_more')); ?></a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.simple', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/bookstack/resources/views/search/all.blade.php ENDPATH**/ ?>